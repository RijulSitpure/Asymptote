from typing import List

class Solution:
    def ambiguousCoordinates(self, s: str) -> List[str]:
        digits = s[1:-1]
        n = len(digits)

        def get_valid(frag: str) -> List[str]:
            res = []
            if len(frag) == 1 or frag[0] != '0':
                res.append(frag)
            for d in range(1, len(frag)):
                left, right = frag[:d], frag[d:]
                if (len(left) == 1 or left[0] != '0') and right[-1] != '0':
                    res.append(f"{left}.{right}")
            return res

        ans = []
        for i in range(1, n):
            left_cand = get_valid(digits[:i])
            right_cand = get_valid(digits[i:])
            for x in left_cand:
                for y in right_cand:
                    ans.append(f"({x}, {y})")
        return ans

def test():
    sol = Solution()
    res1 = set(sol.ambiguousCoordinates("(123)"))
    exp1 = {"(1, 23)", "(12, 3)", "(1.2, 3)", "(1, 2.3)"}
    assert res1 == exp1, f"test 1 failed: {res1}"
    res2 = set(sol.ambiguousCoordinates("(00011)"))
    exp2 = {"(0.001, 1)", "(0, 0.011)"}
    assert res2 == exp2, f"test 2 failed: {res2}"
    print("✓ ambiguous-coordinates passed")

if __name__ == "__main__":
    test()
