from typing import List

class Solution:
    def powerfulIntegers(self, x: int, y: int, bound: int) -> List[int]:
        px = [1]
        if x > 1:
            while px[-1] * x < bound:
                px.append(px[-1] * x)
        py = [1]
        if y > 1:
            while py[-1] * y < bound:
                py.append(py[-1] * y)
        res = set()
        for a in px:
            for b in py:
                if a + b <= bound:
                    res.add(a + b)
        return sorted(res)

def test():
    sol = Solution()
    assert sol.powerfulIntegers(2, 3, 10) == [2, 3, 4, 5, 7, 9, 10], "test 1 failed"
    assert sol.powerfulIntegers(3, 5, 15) == [2, 4, 6, 8, 10, 14], "test 2 failed"
    print("✓ powerful-integers passed")

if __name__ == "__main__":
    test()
