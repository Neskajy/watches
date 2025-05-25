const video__element = document.getElementById("video");
const play__video = document.getElementById("play__video")
const burger__button  = document.getElementById("burger__button");
const burger__window = document.getElementById("burger__window");


function Watch() {
    const video__element__width = video__element.clientWidth;
    const video__element__height = video__element.clientHeight;
    
    video__element.innerHTML = `<iframe width=${video__element__width} height=${video__element__height} src="https://www.youtube.com/embed/iE39q-IKOzA?si=RpU9eTDKGVNOor1J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

burger__button.addEventListener("click", () => {
    console.log(1)
    burger__button.classList.toggle("active");
    burger__window.classList.toggle("active");
});

video__element.addEventListener("click", Watch);
play__video.addEventListener("click", Watch);
