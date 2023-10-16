/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import './rangeSlider.css';

const RangeSlider = (props) => {
    const { minValue, maxValue } = props;

    const inputMinRef = useRef(null);
    const inputMaxRef = useRef(null);
    const sliderTrackRef = useRef(null);

    let sliderMaxValue, minGap = 0;

    const sliderOne = inputMinRef?.current;
    const sliderTwo = inputMaxRef?.current;
    const sliderTrack = sliderTrackRef.current;

    useEffect(() => {
        sliderMaxValue = 0;
        if (sliderOne) {
            sliderMaxValue = sliderOne.max;
        }

        if(sliderOne && sliderTwo) {
            slideOne();
            slideTwo();
        }
    }, [sliderOne, sliderTwo])

    function slideOne() {
        const diff = parseInt(sliderTwo.value) - parseInt(sliderOne.value);
        if (
            sliderOne &&
            sliderTwo &&
            diff <= minGap
        ) {
            sliderOne.value = parseInt(sliderTwo.value) - minGap;
        }

        if (sliderOne && sliderTrack) {
            fillColor();
        }
    }

    function slideTwo() {
        const diff = parseInt(sliderTwo.value) - parseInt(sliderOne.value);
        if (
            sliderOne &&
            sliderTwo &&
            diff <= minGap
        ) {
            sliderTwo.value = parseInt(sliderOne.value) + minGap;
        }
        if (sliderTwo && sliderTrack) {
            fillColor();
        }
    }

    function fillColor() {
        var percent1 = (sliderOne.value / sliderMaxValue) * 100;
        var percent2 = (sliderTwo.value / sliderMaxValue) * 100;
        sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
    }

    return <div className='wrapper'>
        <div className="slider-track" ref={sliderTrackRef}></div>
        <input
            type="range"
            min="20"
            max="60"
            defaultValue={minValue}
            ref={inputMinRef}
            disabled
        />
        <input
            type="range"
            min="20"
            max="60"
            defaultValue={maxValue}
            ref={inputMaxRef}
            disabled
        />
    </div>
}

export default RangeSlider;