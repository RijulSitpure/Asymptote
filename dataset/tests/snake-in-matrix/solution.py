class Solution:
    def finalPositionOfSnake(self, n: int, commands: list[str]) -> int:
        r, c = 0, 0
        for cmd in commands:
            if cmd == "UP":
                r -= 1
            elif cmd == "DOWN":
                r += 1
            elif cmd == "LEFT":
                c -= 1
            elif cmd == "RIGHT":
                c += 1
        return r * n + c
