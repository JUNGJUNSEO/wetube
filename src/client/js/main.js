import "regenerator-runtime";
import "../scss/styles.scss";

const videoMixinAll = document.querySelectorAll(".video-mixin");
let controlsTimeout = null;

const handleMouseMove = (event) => {
    controlsTimeout = setTimeout(()=>{
        event.path[0].classList.add("disappear")
    }, 1000);
}


videoMixinAll.forEach((videoMixin) => {
    videoMixin.addEventListener("mousemove", handleMouseMove)
})
