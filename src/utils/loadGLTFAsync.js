import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();
const loadGLTFModelAsync = item =>
  new Promise((resolve, reject) =>
    loader.load(item, data => resolve(data), progress => {}, e => reject(e))
  );

export default loadGLTFModelAsync;
