from typing import List

class Solution:
    def multiply(self, poly1: List[int], poly2: List[int]) -> List[int]:
        n1, n2 = len(poly1), len(poly2)
        res = [0] * (n1 + n2 - 1)
        for i in range(n1):
            for j in range(n2):
                res[i + j] += poly1[i] * poly2[j]
        return res

def run_tests():
    s = Solution()
    res = s.multiply([1, 2], [3, 4])
    assert res == [3, 10, 8], f"Expected [3, 10, 8], got {res}"
    print("3549 multiply-two-polynomials PASSED")

if __name__ == "__main__":
    run_tests()
