class Solution:
    def shiftingLetters(self, s: str, shifts: list[list[int]]) -> str:
        n = len(s)
        diff = [0] * (n + 1)
        for start, end, direction in shifts:
            delta = 1 if direction == 1 else -1
            diff[start] += delta
            diff[end + 1] -= delta
        cur = 0
        res = []
        for i in range(n):
            cur += diff[i]
            shift = (ord(s[i]) - ord('a') + cur) % 26
            res.append(chr(ord('a') + shift))
        return "".join(res)
