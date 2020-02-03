$(document).ready(() => {
    let $images    = $(".slider img"),
        indexImage = 0,
        delay      = 250,
        animation  = false,

        autoNextMs = 10000,
        timerAutoNext,
        timerWait;

    autoNextImage(autoNextMs);

    $(".slider__arrow1").on("click", () => {
        if (!animation) {
            previousImage();

            clearTimeout(timerWait);
            clearInterval(timerAutoNext);
            timerWait = setTimeout(() => {
                autoNextImage(autoNextMs);
            }, autoNextMs);
        }
    });

    $(".slider__arrow2").on("click", () => {
        if (!animation) {
            nextImage();

            clearTimeout(timerWait);
            clearInterval(timerAutoNext);
            timerWait = setTimeout(() => {
                autoNextImage(autoNextMs);
            }, autoNextMs);
        }
    });

    function previousImage() {
        if (indexImage === 0) {
            animation = true;
            $($images[0]).fadeOut(delay, () => {
                $($images[$images.length-1]).fadeIn(delay, () => {
                    animation = false;
                });
            });

            indexImage = $images.length-1;
        } else {
            animation = true;
            $($images[indexImage]).fadeOut(delay, () => {
                $($images[indexImage]).fadeIn(delay, () => {
                    animation = false;
                });
            });

            indexImage--;
        }
    }

    function nextImage() {
        if (indexImage === $images.length-1) {
            animation = true;
            $($images[indexImage]).fadeOut(delay, () => {
                $($images[0]).fadeIn(delay, () => {
                    animation = false;
                });
            });

            indexImage = 0;
        } else {
            animation = true;
            $($images[indexImage]).fadeOut(delay, () => {
                $($images[indexImage]).fadeIn(delay, () => {
                    animation = false;
                });
            });

            indexImage++;
        }
    }

    function autoNextImage(ms) {
        timerAutoNext = setInterval(nextImage, ms);
    }

});