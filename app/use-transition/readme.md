THATS A COMPARISION BETWEEN ZUSTAND AND NORMAL REACT STATE WITH THE HELP OF TRANSITION

REACT setState update is internally and only happen on next render, so you have not access directly to latest data until Next render
average time on re-rendering 4000 items ~ 250ms (duration of isPending is calculated)

Zustand updates its inner state synchronus, so you have access to latest date inside store even before re-rendering.
average time on re-rendering 4000 items ~ 250ms (duration of isPending is calculated)

performance is equal
