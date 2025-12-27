# 3D Cikgu Maya - Quick Start Guide

**Since Ready Player Me is no longer available, here are your options:**

---

## ⚡ FASTEST PATH (Recommended for Learning)

### **Option: Three.js Geometric Character**

**Time:** 2-3 hours total  
**Difficulty:** Easiest  
**Cost:** FREE  
**Quality:** Stylized/Professional  

**Just paste this into ClaudeKit:**

```
/cook [Build Cikgu Maya as a stylized geometric 3D character using Three.js:

Create MayaCharacter.tsx component with:
- Head: Sphere (0.4 radius), skin tone (#f4c2a8)
- Body: Capsule (0.4 top, 0.45 bottom, 0.9 height), teal blue (#4a90e2)
- Arms: Cylinders (0.08 radius, 0.7 height) x2, skin tone
- Hands: Spheres (0.12 radius) x2, skin tone
- Eyes: Spheres (0.08 radius) x2, dark brown (#2c1810)
- Hair: Partial sphere (0.45 radius), black (#2c1810)
- Smile: Torus curve for mouth, darker skin tone

Use refs for animated parts (head, arms, jaw for talking)
Apply MeshStandardMaterial with metalness 0.1-0.3, roughness 0.7-0.9
Enable castShadow and receiveShadow on all meshes
Group under single <group ref={characterRef}>

Implement:
- Idle animation (breathing, blinking, subtle movement)
- Talking animation (jaw movement synced to audio amplitude)
- Wave gesture (arm lifts, hand waves)
- Nod gesture (head tilts down 2-3 times)
- Thinking pose (hand to chin)
]
```

**Result:** Professional stylized character, ready in minutes!

---

## 🎨 BEST LOOKING (Realistic Character)

### **Option: AI-Generated via Meshy.ai**

**Time:** 10 minutes (5 min generation + 5 min integration)  
**Difficulty:** Easy  
**Cost:** FREE (200 credits/month)  
**Quality:** Photorealistic/Game-ready  

**Steps:**

1. **Generate Character** (5 minutes):
   ```
   1. Go to https://www.meshy.ai/
   2. Sign up (free account)
   3. Click "Text to 3D"
   4. Paste this prompt:
   
   "Professional Malaysian female teacher, age 35-40, wearing teal 
   business casual blouse and dark pants, shoulder-length black hair, 
   warm friendly smile, standing pose, clean style, low-poly, 
   optimized for web games, auto-rigged"
   
   5. Settings:
      - Art Style: Realistic
      - Poly Count: Low
      - Auto-rig: Yes
      - Texture: 1024x1024
   
   6. Click Generate (wait 2-3 minutes)
   7. Download as GLB
   ```

2. **Integrate into Project**:
   ```bash
   # Put downloaded GLB in public/models/maya.glb
   ```

3. **Tell ClaudeKit**:
   ```
   /cook [Load Cikgu Maya 3D model from public/models/maya.glb:
   
   Use @react-three/drei useGLTF hook
   Wrap in Suspense with loading fallback
   Enable shadows (castShadow, receiveShadow)
   Position at origin
   Scale to 1.0
   Add animations: idle, talking, wave, nod, thinking
   ]
   ```

**Result:** Photorealistic character ready to use!

---

## 📚 HUGE ANIMATION LIBRARY

### **Option: Mixamo (Adobe)**

**Time:** 15 minutes (10 min download + 5 min integration)  
**Difficulty:** Easy  
**Cost:** 100% FREE  
**Quality:** Professional + 2000 free animations  

**Steps:**

1. **Get Character** (10 minutes):
   ```
   1. Go to https://www.mixamo.com/
   2. Sign in with Adobe account (free)
   3. Browse Characters → Find professional female
   4. Click character → Download
      - Format: FBX
      - Pose: T-pose
   5. Go to Animations tab
   6. Download these animations:
      - Idle (standing)
      - Talking
      - Waving
      - Nodding
      - Thinking
   7. Convert FBX to GLB:
      - Go to https://products.aspose.app/3d/conversion/fbx-to-glb
      - Upload FBX
      - Download GLB
   ```

2. **Integrate**:
   ```
   /cook [Load Mixamo character and animations:
   
   Character GLB: public/models/maya-character.glb
   Animations: public/models/animations/
   
   Use useGLTF for character
   Use useAnimations for animation clips
   Create animation mixer
   Play appropriate animation based on state
   Enable shadows
   ]
   ```

**Result:** Professional character + tons of animations!

---

## 🎭 FULL CREATIVE CONTROL

### **Option: VRoid Studio**

**Time:** 45 minutes (30 min creation + 15 min integration)  
**Difficulty:** Medium  
**Cost:** FREE  
**Quality:** High-quality anime/semi-realistic  

**Steps:**

1. **Download VRoid** (5 minutes):
   ```
   https://vroid.com/en/studio
   Windows/Mac available
   100% free
   ```

2. **Create Character** (30 minutes):
   ```
   1. Launch VRoid Studio
   2. New Project → Female preset
   3. Customize:
      Face → Mature, professional
      Hair → Shoulder-length, neat
      Eyes → Warm, friendly
      Outfit → Business casual (teal)
   4. Export as VRM
   ```

3. **Integrate**:
   ```
   /cook [Load VRM character:
   
   Install: npm install @pixiv/three-vrm
   Load VRM file: public/models/maya.vrm
   Use VRMLoaderPlugin
   Enable VRM animations
   Add custom animations: talking, gestures
   ]
   ```

**Result:** Fully custom character!

---

## 🚀 Complete Workflow Example

**For fastest MVP, use Three.js Geometric:**

```bash
# In ClaudeKit, run these in order:

/plan [Build 3D Cikgu Maya Interactive Assistant - see full PRD]

/design:good [Design UI for Cikgu Maya - see full PRD]

/cook [Build geometric 3D character - use Quick Start prompt above]

/cook [Build chat interface - see PRD Prompt 5]

/cook [Build voice system - see PRD Prompt 6]

/cook [Build mock AI - see PRD Prompt 7]

/cook [Integrate everything - see PRD Prompt 8]

/test [Test all components - see PRD Prompt 9]
```

**Later upgrade to realistic model:**

```bash
# 1. Generate model on Meshy.ai (5 min)
# 2. Download GLB
# 3. Replace character component:

/cook [Replace geometric character with GLB model from Meshy.ai:

Update MayaCharacter.tsx to load public/models/maya.glb
Use useGLTF hook
Keep same animation system
Adjust scale if needed
]
```

---

## 💡 Which Option Should I Choose?

**Choose Three.js Geometric if:**
- ✅ You want to get started immediately
- ✅ You want zero dependencies
- ✅ You prefer stylized over realistic
- ✅ You want full control over the code

**Choose AI-Generated (Meshy.ai) if:**
- ✅ You want photorealistic character
- ✅ You're okay with 5-minute wait
- ✅ You want production-ready model
- ✅ You need auto-rigging

**Choose Mixamo if:**
- ✅ You want tons of animations
- ✅ You want 100% free solution
- ✅ You don't mind FBX→GLB conversion
- ✅ You want high-quality model immediately

**Choose VRoid if:**
- ✅ You want complete creative control
- ✅ You like anime/Asian aesthetic
- ✅ You have 30 minutes to design
- ✅ You want unique character

---

## 🤔 FAQ

**Q: Can I use the geometric character in production?**  
A: Absolutely! It looks professional and stylized. Many successful apps use geometric characters.

**Q: Can I switch from geometric to realistic later?**  
A: Yes! Easy 10-minute swap. The animation system stays the same.

**Q: What if Meshy.ai free tier runs out?**  
A: Use Sketchfab or Mixamo instead. Both have unlimited free models.

**Q: Do I need to know 3D modeling?**  
A: No! All options are either code-generated or template-based.

**Q: Which is fastest to integrate?**  
A: Three.js geometric - ClaudeKit generates everything in minutes.

**Q: Which looks best?**  
A: AI-generated (Meshy.ai) or VRoid Studio for realistic/semi-realistic quality.

---

## 📦 Resources

- **Meshy.ai:** https://www.meshy.ai/
- **Mixamo:** https://www.mixamo.com/
- **Sketchfab:** https://sketchfab.com/
- **VRoid Studio:** https://vroid.com/en/studio
- **FBX to GLB Converter:** https://products.aspose.app/3d/conversion/fbx-to-glb
- **Three.js Docs:** https://threejs.org/docs/
- **React Three Fiber:** https://docs.pmnd.rs/react-three-fiber

---

**Start with Three.js geometric, get MVP working, then upgrade to realistic model if desired!**

Happy building! 🚀
