class Solution:
    def modifyString(self, s: str) -> str:
        res = list(s)
        for i in range(len(res)):
            if res[i] == "?":
                for ch in ["a", "b", "c"]:
                    prev_ch = res[i - 1] if i > 0 else ""
                    next_ch = res[i + 1] if i + 1 < len(res) else ""
                    if ch != prev_ch and ch != next_ch:
                        res[i] = ch
                        break
        return "".join(res)

def test():
    sol = Solution()
    assert sol.modifyString("?zs") == "azs", "test 1 failed"
    assert sol.modifyString("ubv?w") == "ubvaw", "test 2 failed"
    print("✓ replace-all-s-to-avoid-consecutive-repeating-characters passed")

if __name__ == "__main__":
    test()
