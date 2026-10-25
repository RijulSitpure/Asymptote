class Solution:
    def angleClock(self, hour: int, minutes: int) -> float:
        h_angle = (hour % 12) * 30 + minutes * 0.5
        m_angle = minutes * 6
        diff = abs(h_angle - m_angle)
        return min(diff, 360 - diff)

def test():
    sol = Solution()
    assert sol.angleClock(12, 30) == 165, "test 1 failed"
    assert sol.angleClock(3, 30) == 75, "test 2 failed"
    assert sol.angleClock(3, 15) == 7.5, "test 3 failed"
    print("✓ angle-between-hands-of-a-clock passed")

if __name__ == "__main__":
    test()
