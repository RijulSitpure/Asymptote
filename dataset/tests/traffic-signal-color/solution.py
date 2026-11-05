def trafficSignal(t: int, g: int, y: int, r: int) -> str:
    cycle = g + y + r
    rem = t % cycle
    if rem < g:
        return "Green"
    elif rem < g + y:
        return "Yellow"
    else:
        return "Red"
