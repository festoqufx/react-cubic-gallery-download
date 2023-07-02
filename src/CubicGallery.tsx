import { useEffect, useRef } from "react";

// Number of items on each cube face
const FACE_SIZE = 3;
const ITEM_SIZE = 240;
const ITEM_DISTANCE = 40;

const CubicGallery = (props:{imageData:string[]}) => {
  
  const el = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const animId = useRef<number>(0);
  let mouseX:number, mouseY:number, angleX:number, angleY:number;

  useEffect(() => {

    if (props.imageData.length == 0) return;

    // Setup item positions and angles
    const items = el.current!.children;

    // Build cubic face and distribute the items in correct locations
    let count = 0;
    const cellSize = ITEM_SIZE + ITEM_DISTANCE;
    const cubeSize = cellSize * FACE_SIZE;
    let origin = -cubeSize * 0.5 + cellSize * 0.5;

    const buildFace = (faceId:number) => {

      for (let i = 0; i < FACE_SIZE; i++) {
        for (let j = 0; j < FACE_SIZE; j++) {

          const item = items[count++] as HTMLDivElement;
          switch (faceId) {

            // Front face
            case 0:
                item.style.transform = `translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
            // Back face
            case 1:
                item.style.transform = `rotateY(180deg) translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
            // Left face
            case 2:
                item.style.transform = `rotateY(-90deg) translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
            // Right face
            case 3:
                item.style.transform = `rotateY(90deg) translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
            // Top face
            case 4:
                item.style.transform = `rotateX(90deg) translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
            // Bottom face
            case 5:
                item.style.transform = `rotateX(-90deg) translateX(${j * cellSize + origin}px) translateY(${i * cellSize + origin}px) translateZ(${cubeSize * 0.5}px)`;
                break;
          }
        }
      }
    }
    for (let i = 0; i < 6; i++) buildFace(i);

    // Reset transitional variables
    angleX = 0; angleY = 0; mouseX = mouseY = 0;

    // Detect mouse movement
    document.body.onmousemove = (e:MouseEvent) => {
      mouseX = -((e.clientX / innerWidth) - 0.5) * 1.25;
      mouseY = ((e.clientY / innerHeight) - 0.5) * 1.25;
    };

    const gallery = el.current!;

    // Rotate and animate the gallery
    cancelAnimationFrame(animId.current);
    const updateFrame = () => {

      angleX += mouseX;
      angleY += mouseY;
      gallery.style.transform = `translateZ(-1200px) rotateY(${angleX}deg) rotateX(${angleY}deg)`;
      animId.current = requestAnimationFrame(updateFrame);
    }
    updateFrame();

  }, [props.imageData]);

  // Display the image
  const pickImage = (imgUrl:string) => {
    img.current!.style.backgroundImage = `url(${imgUrl})`;
    img.current!.style.transform = 'scale(1, 1)';
  }

  return (
    <div className="container my-4">
      <div className="cubic-gallery" ref={el}>
        {props.imageData.map((it, index) => 
          <div 
              onClick={() => pickImage(it)}
              key={index} 
              style={{backgroundImage:`url(${it})`}}
              className='cubic-gallery-item'>
          </div>)
        }
      </div>
      <div 
          onClick={() => {img.current!.style.transform = 'scale(0.0, 0.0)'}}
          className='image-display' 
          ref={img}>
      </div>
    </div>
  )
}

export default CubicGallery;
