class Robot:
    def __init__(self, width: int, height: int):
        self.w = width
        self.h = height
        self.perimeter = 2 * (width + height) - 4
        self.pos = 0
        self.moved = False

    def step(self, num: int) -> None:
        self.moved = True
        self.pos = (self.pos + num) % self.perimeter

    def getPos(self) -> list[int]:
        p = self.pos
        w, h = self.w, self.h
        if p < w:
            return [p, 0]
        p -= (w - 1)
        if p < h:
            return [w - 1, p]
        p -= (h - 1)
        if p < w:
            return [w - 1 - p, h - 1]
        p -= (w - 1)
        return [0, h - 1 - p]

    def getDir(self) -> str:
        if not self.moved:
            return "East"
        p = self.pos
        w, h = self.w, self.h
        if p == 0:
            return "South"
        if p < w:
            return "East"
        p -= (w - 1)
        if p < h:
            return "North"
        p -= (h - 1)
        if p < w:
            return "West"
        return "South"
