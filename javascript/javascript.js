const mariojs = document.querySelector(".mario");
const pipejs = document.querySelector(".pipe");
const cloudjs = document.querySelector(".cloud");

function nojump()
{

    mariojs.classList.remove('jump-class');

}







const loop =  setInterval(function () {

    const pipePosition = pipejs.offsetLeft;
    const marioPosition = +window.getComputedStyle(mariojs).bottom.replace('px', '');
    const cloudPosition = cloudjs.offsetLeft;

    if (pipePosition <= 70 && pipePosition > 0 && marioPosition < 58) {
        pipejs.style.animation = 'none';
        pipejs.style.left = pipePosition + 'px';


        mariojs.style.animation = 'none';
        mariojs.style.bottom = marioPosition + 'px';

        mariojs.src = './image/game-over.png';
        mariojs.style.width = '35px';
        mariojs.style.marginLeft = '50px';

        cloudjs.style.animation = 'none';
        cloudjs.style.left = cloudPosition + 'px';

        

        clearInterval(loop);
    }

});




document.addEventListener('keydown', () =>{
    mariojs.classList.add('jump-class');

    setTimeout(nojump, 800);
});