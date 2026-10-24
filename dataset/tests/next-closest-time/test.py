class Solution:
    def nextClosestTime(self, time: str) -> str:
        cur = int(time[:2]) * 60 + int(time[3:])
        allowed = {int(d) for d in time if d != ":"}
        while True:
            cur = (cur + 1) % 1440
            h, m = cur // 60, cur % 60
            digits = {h // 10, h % 10, m // 10, m % 10}
            if digits.issubset(allowed):
                return f"{h:02d}:{m:02d}"

def test():
    sol = Solution()
    assert sol.nextClosestTime("19:34") == "19:39", "test 1 failed"
    assert sol.nextClosestTime("23:59") == "22:22", "test 2 failed"
    print("✓ next-closest-time passed")

if __name__ == "__main__":
    test()
