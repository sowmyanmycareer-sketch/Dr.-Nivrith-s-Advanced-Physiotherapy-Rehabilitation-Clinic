import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ANATOMY_POINTS } from '../data/clinicData.ts';
import { AnatomyPoint } from '../types.ts';
import { RotateCcw, ZoomIn, ZoomOut, Play, Pause, Layers, Crosshair, Sparkles } from 'lucide-react';

interface Anatomy3DCanvasProps {
  selectedPointId: string | null;
  onSelectPoint: (point: AnatomyPoint) => void;
  className?: string;
}

export const Anatomy3DCanvas: React.FC<Anatomy3DCanvasProps> = ({
  selectedPointId,
  onSelectPoint,
  className = ""
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const pinsGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Interaction refs
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const touchStartDistRef = useRef(0);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 4.8));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, -0.1, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, -0.1, 0));

  // State
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [viewMode, setViewMode] = useState<'biomechanical' | 'heatmap' | 'hologram'>('biomechanical');
  const [hoveredPointName, setHoveredPointName] = useState<string | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    try {
      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 500;
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0, 4.8);
      cameraRef.current = camera;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      rendererRef.current = renderer;

      // Clean container and attach canvas
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // Lighting Setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0x2dd4bf, 2.2);
      directionalLight.position.set(4, 6, 5);
      scene.add(directionalLight);

      const backlight = new THREE.DirectionalLight(0x38bdf8, 1.8);
      backlight.position.set(-4, -2, -4);
      scene.add(backlight);

      const keyLight = new THREE.PointLight(0x14b8a6, 2, 10);
      keyLight.position.set(0, 0, 3);
      scene.add(keyLight);

      // Root model group
      const rootGroup = new THREE.Group();
      scene.add(rootGroup);
      modelGroupRef.current = rootGroup;

      // Pins group
      const pinsGroup = new THREE.Group();
      rootGroup.add(pinsGroup);
      pinsGroupRef.current = pinsGroup;

      // Build Procedural Biomechanical Skeletal Model
      buildBiomechanicalModel(rootGroup, viewMode);
      buildInteractivePins(pinsGroup);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animFrameIdRef.current = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // Auto rotation
        if (isAutoRotating && !isDraggingRef.current && rootGroup) {
          rootGroup.rotation.y += 0.4 * delta;
        } else if (rootGroup) {
          // Smooth damp manual rotation
          rootGroup.rotation.y += (targetRotationRef.current.y - rootGroup.rotation.y) * 0.1;
          rootGroup.rotation.x += (targetRotationRef.current.x - rootGroup.rotation.x) * 0.1;
          // Clamp vertical pitch
          rootGroup.rotation.x = Math.max(-0.6, Math.min(0.6, rootGroup.rotation.x));
        }

        // Pulse pin rings & glows
        pinsGroup.children.forEach((pinObj) => {
          const halo = pinObj.getObjectByName('pinHalo');
          if (halo) {
            const scale = 1 + Math.sin(elapsedTime * 4 + Number(pinObj.userData.pointIndex || 0)) * 0.22;
            halo.scale.set(scale, scale, scale);
          }
          const beacon = pinObj.getObjectByName('beaconRing');
          if (beacon) {
            beacon.rotation.z += 0.03;
          }
        });

        // Smooth camera lerp
        if (camera) {
          camera.position.lerp(targetCameraPosRef.current, 0.06);
          currentLookAtRef.current.lerp(targetLookAtRef.current, 0.06);
          camera.lookAt(currentLookAtRef.current);
        }

        renderer.render(scene, camera);
      };

      animate();

      // Resize observer
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: newWidth, height: newHeight } = entry.contentRect;
          if (newWidth > 0 && newHeight > 0 && cameraRef.current && rendererRef.current) {
            cameraRef.current.aspect = newWidth / newHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(newWidth, newHeight);
          }
        }
      });
      resizeObserver.observe(container);

      return () => {
        if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
        resizeObserver.disconnect();
        renderer.dispose();
      };
    } catch (e) {
      console.warn("WebGL initialization note:", e);
      setWebglSupported(false);
    }
  }, []);

  // Update materials when viewMode changes
  useEffect(() => {
    if (!modelGroupRef.current) return;
    // Rebuild model meshes for mode
    const group = modelGroupRef.current;
    // Remove old anatomy meshes (preserve pins)
    const toRemove: THREE.Object3D[] = [];
    group.children.forEach(child => {
      if (child !== pinsGroupRef.current) toRemove.push(child);
    });
    toRemove.forEach(obj => group.remove(obj));

    buildBiomechanicalModel(group, viewMode);
  }, [viewMode]);

  // Focus camera on selected anatomical hotspot
  useEffect(() => {
    if (!selectedPointId) {
      targetCameraPosRef.current.set(0, 0, 4.8);
      targetLookAtRef.current.set(0, -0.1, 0);
      return;
    }

    const targetPt = ANATOMY_POINTS.find(p => p.id === selectedPointId);
    if (targetPt && cameraRef.current) {
      const [x, y, z] = targetPt.position3D;
      // Frame the selected joint with a slight offset
      targetCameraPosRef.current.set(x * 0.4, y + 0.15, z + 2.5);
      targetLookAtRef.current.set(x * 0.5, y, z);
      // Temporarily halt auto rotation to allow close inspection
      setIsAutoRotating(false);
    }
  }, [selectedPointId]);

  // Procedural Biomechanical Skeleton Builder
  const buildBiomechanicalModel = (parent: THREE.Group, mode: 'biomechanical' | 'heatmap' | 'hologram') => {
    const isWire = mode === 'hologram';
    
    // Primary bone material
    let boneMat: THREE.Material;
    let jointMat: THREE.Material;
    let spineMat: THREE.Material;
    let discMat: THREE.Material;

    if (mode === 'biomechanical') {
      boneMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.65,
        roughness: 0.35,
        wireframe: false,
      });
      jointMat = new THREE.MeshStandardMaterial({
        color: 0x2dd4bf, // Teal accent
        emissive: 0x115e59,
        emissiveIntensity: 0.4,
        metalness: 0.5,
        roughness: 0.2,
      });
      spineMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x075985,
        emissiveIntensity: 0.3,
        metalness: 0.7,
        roughness: 0.3,
      });
      discMat = new THREE.MeshStandardMaterial({
        color: 0x14b8a6,
        roughness: 0.4,
      });
    } else if (mode === 'heatmap') {
      boneMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.7,
      });
      jointMat = new THREE.MeshStandardMaterial({
        color: 0xf43f5e, // Hot red/rose for pain zones
        emissive: 0xbe123c,
        emissiveIntensity: 0.7,
        roughness: 0.2,
      });
      spineMat = new THREE.MeshStandardMaterial({
        color: 0xfb923c, // Orange for spine load
        emissive: 0xc2410c,
        emissiveIntensity: 0.5,
      });
      discMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
      });
    } else {
      // Hologram wireframe
      boneMat = new THREE.MeshBasicMaterial({
        color: 0x2dd4bf,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
      jointMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
      });
      spineMat = new THREE.MeshBasicMaterial({
        color: 0xa78bfa,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      discMat = new THREE.MeshBasicMaterial({
        color: 0x2dd4bf,
        wireframe: true,
      });
    }

    const anatomyContainer = new THREE.Group();

    // 1. Cranium / Head
    const skullGeo = new THREE.SphereGeometry(0.32, 20, 16);
    skullGeo.scale(0.85, 1.1, 0.95);
    const skull = new THREE.Mesh(skullGeo, boneMat);
    skull.position.set(0, 1.72, 0);
    anatomyContainer.add(skull);

    // 2. Cervical Spine & Thoracic & Lumbar Spine (Articulated Segmental Vertebrae)
    const spineCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.45, 0.02),   // C1
      new THREE.Vector3(0, 1.25, -0.02),  // C7
      new THREE.Vector3(0, 0.95, -0.08),  // T4
      new THREE.Vector3(0, 0.55, -0.06),  // T10
      new THREE.Vector3(0, 0.15, 0.0),    // L1
      new THREE.Vector3(0, -0.25, 0.04),  // L5
      new THREE.Vector3(0, -0.55, -0.02), // Sacrum
    ]);

    const vertebraPoints = spineCurve.getPoints(18);
    vertebraPoints.forEach((pt, i) => {
      const isLumbar = i >= 11 && i <= 15;
      const isCervical = i <= 3;
      const vSize = 0.08 + (i > 10 ? 0.03 : (i < 4 ? -0.01 : 0.01));
      
      const vGeo = new THREE.BoxGeometry(vSize * 1.5, vSize * 0.7, vSize * 1.2);
      const vertebra = new THREE.Mesh(
        vGeo,
        isLumbar || isCervical ? spineMat : boneMat
      );
      vertebra.position.copy(pt);
      anatomyContainer.add(vertebra);

      // Intervertebral disc
      if (i < vertebraPoints.length - 1) {
        const nextPt = vertebraPoints[i + 1];
        const discMid = pt.clone().add(nextPt).multiplyScalar(0.5);
        const discGeo = new THREE.CylinderGeometry(vSize * 0.65, vSize * 0.65, 0.02, 12);
        const disc = new THREE.Mesh(discGeo, discMat);
        disc.position.copy(discMid);
        anatomyContainer.add(disc);
      }
    });

    // 3. Thoracic Rib Cage contour
    for (let r = 0; r < 7; r++) {
      const ribY = 1.05 - r * 0.12;
      const ribWidth = 0.35 + Math.sin((r / 6) * Math.PI) * 0.28;
      const ribGeo = new THREE.TorusGeometry(ribWidth, 0.022, 8, 24, Math.PI * 1.75);
      const rib = new THREE.Mesh(ribGeo, boneMat);
      rib.rotation.x = Math.PI / 2.2;
      rib.rotation.z = -Math.PI * 0.88;
      rib.position.set(0, ribY, -0.02);
      anatomyContainer.add(rib);
    }

    // 4. Clavicles & Shoulder Girdle
    [-1, 1].forEach((side) => {
      // Clavicle
      const clavGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.45, 10);
      const clavicle = new THREE.Mesh(clavGeo, boneMat);
      clavicle.position.set(side * 0.35, 1.2, 0.08);
      clavicle.rotation.z = side * -0.25;
      clavicle.rotation.y = side * 0.2;
      anatomyContainer.add(clavicle);

      // Shoulder Joint Head (Glenohumeral)
      const shoulderGeo = new THREE.SphereGeometry(0.09, 14, 14);
      const shoulder = new THREE.Mesh(shoulderGeo, jointMat);
      shoulder.position.set(side * 0.68, 1.05, 0.02);
      anatomyContainer.add(shoulder);

      // Humerus (Upper arm)
      const humerusGeo = new THREE.CylinderGeometry(0.045, 0.04, 0.65, 10);
      const humerus = new THREE.Mesh(humerusGeo, boneMat);
      humerus.position.set(side * 0.78, 0.68, 0.02);
      humerus.rotation.z = side * -0.15;
      anatomyContainer.add(humerus);

      // Elbow Joint
      const elbowGeo = new THREE.SphereGeometry(0.065, 12, 12);
      const elbow = new THREE.Mesh(elbowGeo, jointMat);
      elbow.position.set(side * 0.85, 0.32, 0.02);
      anatomyContainer.add(elbow);

      // Forearm (Radius/Ulna)
      const forearmGeo = new THREE.CylinderGeometry(0.035, 0.03, 0.6, 10);
      const forearm = new THREE.Mesh(forearmGeo, boneMat);
      forearm.position.set(side * 0.9, -0.02, 0.08);
      forearm.rotation.z = side * -0.1;
      forearm.rotation.x = 0.2;
      anatomyContainer.add(forearm);
    });

    // 5. Pelvis & Sacral Basin
    const pelvisGeo = new THREE.TorusGeometry(0.38, 0.085, 10, 24, Math.PI * 1.5);
    const pelvis = new THREE.Mesh(pelvisGeo, jointMat);
    pelvis.position.set(0, -0.38, 0.02);
    pelvis.rotation.x = Math.PI / 2.3;
    pelvis.rotation.z = -Math.PI * 0.75;
    anatomyContainer.add(pelvis);

    // 6. Lower Limbs (Femur, Knee, Tibia, Ankle, Foot)
    [-1, 1].forEach((side) => {
      // Hip Joint
      const hipGeo = new THREE.SphereGeometry(0.09, 14, 14);
      const hip = new THREE.Mesh(hipGeo, jointMat);
      hip.position.set(side * 0.35, -0.42, 0.05);
      anatomyContainer.add(hip);

      // Femur (Thigh Bone)
      const femurGeo = new THREE.CylinderGeometry(0.055, 0.045, 0.78, 12);
      const femur = new THREE.Mesh(femurGeo, boneMat);
      femur.position.set(side * 0.38, -0.85, 0.08);
      femur.rotation.z = side * 0.05;
      anatomyContainer.add(femur);

      // KNEE JOINT (Special High Detail with Patella & Meniscus ring)
      const kneeGroup = new THREE.Group();
      kneeGroup.position.set(side * 0.38, -1.28, 0.1);

      const kneeCondyleGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.12, 16);
      const kneeJoint = new THREE.Mesh(kneeCondyleGeo, jointMat);
      kneeJoint.rotation.z = Math.PI / 2;
      kneeGroup.add(kneeJoint);

      // Patella (Knee Cap)
      const patellaGeo = new THREE.SphereGeometry(0.055, 12, 12);
      patellaGeo.scale(1.1, 1.3, 0.6);
      const patella = new THREE.Mesh(patellaGeo, spineMat);
      patella.position.set(0, 0.02, 0.09);
      kneeGroup.add(patella);

      anatomyContainer.add(kneeGroup);

      // Tibia & Fibula (Shin)
      const tibiaGeo = new THREE.CylinderGeometry(0.045, 0.038, 0.78, 10);
      const tibia = new THREE.Mesh(tibiaGeo, boneMat);
      tibia.position.set(side * 0.37, -1.72, 0.12);
      anatomyContainer.add(tibia);

      // Ankle Joint (Malleolus)
      const ankleGeo = new THREE.SphereGeometry(0.065, 12, 12);
      const ankle = new THREE.Mesh(ankleGeo, jointMat);
      ankle.position.set(side * 0.36, -2.14, 0.14);
      anatomyContainer.add(ankle);

      // Foot & Plantar Arch
      const footGeo = new THREE.BoxGeometry(0.11, 0.07, 0.28);
      const foot = new THREE.Mesh(footGeo, boneMat);
      foot.position.set(side * 0.36, -2.22, 0.24);
      anatomyContainer.add(foot);
    });

    // Holographic ground alignment grid disc
    const gridGeo = new THREE.RingGeometry(0.2, 1.6, 32);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x0f766e,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.position.set(0, -2.28, 0);
    grid.rotation.x = Math.PI / 2;
    anatomyContainer.add(grid);

    parent.add(anatomyContainer);
  };

  // Build Interactive Hotspot Pins
  const buildInteractivePins = (parent: THREE.Group) => {
    // Clear old
    while (parent.children.length > 0) {
      parent.remove(parent.children[0]);
    }

    ANATOMY_POINTS.forEach((point, index) => {
      const pinContainer = new THREE.Group();
      pinContainer.position.set(point.position3D[0], point.position3D[1], point.position3D[2]);
      pinContainer.userData = { pointId: point.id, pointName: point.name, pointIndex: index };

      // Core sphere
      const sphereGeo = new THREE.SphereGeometry(0.075, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(point.color),
        emissive: new THREE.Color(point.color),
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.2,
      });
      const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
      coreSphere.name = 'pinCore';
      pinContainer.add(coreSphere);

      // Outer animated pulsing halo
      const haloGeo = new THREE.SphereGeometry(0.12, 14, 14);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(point.color),
        transparent: true,
        opacity: 0.35,
        wireframe: true,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.name = 'pinHalo';
      pinContainer.add(halo);

      // Circular beacon ring
      const ringGeo = new THREE.TorusGeometry(0.14, 0.015, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(point.color),
        transparent: true,
        opacity: 0.75,
      });
      const beaconRing = new THREE.Mesh(ringGeo, ringMat);
      beaconRing.name = 'beaconRing';
      pinContainer.add(beaconRing);

      parent.add(pinContainer);
    });
  };

  // Raycasting for Mouse and Touch clicks
  const handlePointerInteraction = (clientX: number, clientY: number) => {
    if (!mountRef.current || !cameraRef.current || !pinsGroupRef.current) return;

    const rect = mountRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const intersects = raycaster.intersectObjects(pinsGroupRef.current.children, true);

    if (intersects.length > 0) {
      let currentObj: THREE.Object3D | null = intersects[0].object;
      while (currentObj && !currentObj.userData.pointId && currentObj.parent) {
        currentObj = currentObj.parent;
      }

      if (currentObj && currentObj.userData.pointId) {
        const found = ANATOMY_POINTS.find(p => p.id === currentObj?.userData.pointId);
        if (found) {
          onSelectPoint(found);
        }
      }
    }
  };

  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    } else {
      // Check hover
      if (!mountRef.current || !cameraRef.current || !pinsGroupRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
      const intersects = raycaster.intersectObjects(pinsGroupRef.current.children, true);

      if (intersects.length > 0) {
        let currentObj: THREE.Object3D | null = intersects[0].object;
        while (currentObj && !currentObj.userData.pointId && currentObj.parent) {
          currentObj = currentObj.parent;
        }
        if (currentObj && currentObj.userData.pointName) {
          setHoveredPointName(currentObj.userData.pointName);
        }
      } else {
        setHoveredPointName(null);
      }
    }
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      const dist = Math.hypot(
        e.clientX - previousMousePositionRef.current.x,
        e.clientY - previousMousePositionRef.current.y
      );
      if (dist < 4) {
        handlePointerInteraction(e.clientX, e.clientY);
      }
    }
    isDraggingRef.current = false;
  };

  // Touch Handlers for Mobile
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      // Pinch zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDistRef.current = Math.hypot(dx, dy);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.01;
      targetRotationRef.current.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      const pinchDelta = currentDist - touchStartDistRef.current;
      touchStartDistRef.current = currentDist;

      // Adjust camera distance
      targetCameraPosRef.current.z = Math.max(
        2.2,
        Math.min(6.5, targetCameraPosRef.current.z - pinchDelta * 0.01)
      );
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length > 0) {
      const t = e.changedTouches[0];
      handlePointerInteraction(t.clientX, t.clientY);
    }
    isDraggingRef.current = false;
  };

  // Zoom helpers
  const handleZoom = (direction: 'in' | 'out') => {
    const delta = direction === 'in' ? -0.8 : 0.8;
    targetCameraPosRef.current.z = Math.max(2.2, Math.min(6.2, targetCameraPosRef.current.z + delta));
  };

  const handleResetCamera = () => {
    targetCameraPosRef.current.set(0, 0, 4.8);
    targetLookAtRef.current.set(0, -0.1, 0);
    targetRotationRef.current = { x: 0, y: 0 };
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
    setIsAutoRotating(true);
  };

  if (!webglSupported) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center ${className}`}>
        <p className="text-teal-400 font-semibold mb-2">3D Biomechanical System Preview</p>
        <p className="text-slate-400 text-sm max-w-sm">
          WebGL acceleration is in compatibility mode. Use the symptom buttons below to inspect Dr. Nivrith’s targeted anatomical protocols.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col w-full h-full min-h-[460px] md:min-h-[580px] bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 rounded-2xl border border-teal-500/20 shadow-2xl overflow-hidden select-none ${className}`}>
      {/* 3D Canvas Viewport */}
      <div
        ref={mountRef}
        id="three-canvas-viewport"
        className="w-full h-full flex-1 cursor-grab active:cursor-grabbing canvas-container"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      {/* Top HUD: Status, View Mode & Hover Indicator */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-teal-500/30 text-xs font-medium text-teal-300">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span>3D Biomechanical Viewer</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">Touch or Click Pins</span>
        </div>

        {hoveredPointName && (
          <div className="bg-teal-950/90 border border-teal-400/50 text-teal-200 text-xs px-3 py-1 rounded-full font-medium shadow-lg animate-fade-in hidden sm:block">
            Target: {hoveredPointName}
          </div>
        )}
      </div>

      {/* Mode Toggles */}
      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-1.5 z-10 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/60 shadow-lg">
        <button
          type="button"
          onClick={() => setViewMode('biomechanical')}
          className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
            viewMode === 'biomechanical'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Anatomical Skeletal Mode"
        >
          Skeletal
        </button>
        <button
          type="button"
          onClick={() => setViewMode('heatmap')}
          className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
            viewMode === 'heatmap'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Pain Heatmap Distribution"
        >
          Pain Heatmap
        </button>
        <button
          type="button"
          onClick={() => setViewMode('hologram')}
          className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
            viewMode === 'hologram'
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Kinetic Hologram Wireframe"
        >
          Hologram
        </button>
      </div>

      {/* Floating Camera Controls Right */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-10 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/60 shadow-lg">
        <button
          type="button"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          aria-label={isAutoRotating ? "Pause 3D rotation" : "Auto rotate 3D view"}
          className={`p-2 rounded-lg text-xs transition-colors ${
            isAutoRotating ? 'text-teal-400 bg-teal-950/60' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title={isAutoRotating ? "Pause auto-rotation" : "Resume auto-rotation"}
        >
          {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          type="button"
          onClick={() => handleZoom('in')}
          aria-label="Zoom in"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleZoom('out')}
          aria-label="Zoom out"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleResetCamera}
          aria-label="Reset camera orientation"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Hint Overlay */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none text-[11px] text-slate-400/80 bg-slate-950/70 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-800 md:hidden">
        Drag to rotate • Pinch to zoom • Tap pins
      </div>
    </div>
  );
};
