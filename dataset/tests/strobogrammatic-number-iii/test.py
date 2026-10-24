import sys

class Solution:
    def strobogrammaticInRange(self, low: str, high: str) -> int:
        pairs = [("0", "0"), ("1", "1"), ("6", "9"), ("8", "8"), ("9", "6")]
        count = 0

        def dfs(cur_len: int, target_len: int, path: str):
            nonlocal count
            if cur_len == target_len:
                if (len(low) < target_len or path >= low) and (target_len < len(high) or path <= high):
                    count += 1
                return
            if cur_len > target_len:
                return
            for l, r in pairs:
                if cur_len + 2 == target_len and l == "0":
                    continue
                dfs(cur_len + 2, target_len, l + path + r)

        for length in range(len(low), len(high) + 1):
            if length % 2 == 0:
                dfs(0, length, "")
            else:
                for mid in ["0", "1", "8"]:
                    dfs(1, length, mid)

        return count

def test():
    sol = Solution()
    assert sol.strobogrammaticInRange("50", "100") == 3, "test 1 failed"
    assert sol.strobogrammaticInRange("0", "0") == 1, "test 2 failed"
    print("✓ strobogrammatic-number-iii passed")

if __name__ == "__main__":
    test()
