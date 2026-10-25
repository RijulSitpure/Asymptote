class Solution:
    def slowestKey(self, releaseTimes: list[int], keysPressed: str) -> str:
        best_char = keysPressed[0]
        max_duration = releaseTimes[0]
        for i in range(1, len(releaseTimes)):
            dur = releaseTimes[i] - releaseTimes[i - 1]
            c = keysPressed[i]
            if dur > max_duration or (dur == max_duration and c > best_char):
                max_duration = dur
                best_char = c
        return best_char

def test():
    sol = Solution()
    assert sol.slowestKey([9,29,49,50], "cbcd") == "c"
    assert sol.slowestKey([12,23,36,46,62], "spuda") == "a"

    print("✓ slowest-key passed")

if __name__ == '__main__':
    test()
