from typing import List

class Solution:
    def canConstructGraph(self, degrees: List[int]) -> bool:
        deg = [d for d in degrees if d > 0]
        while deg:
            deg.sort(reverse=True)
            d = deg.pop(0)
            if d > len(deg):
                return False
            for i in range(d):
                deg[i] -= 1
                if deg[i] < 0:
                    return False
            deg = [x for x in deg if x > 0]
        return True

def run_tests():
    sol = Solution()
    assert sol.canConstructGraph([3, 3, 3, 3]) == True
    assert sol.canConstructGraph([3, 3, 3]) == False
    assert sol.canConstructGraph([0, 0, 0]) == True
    assert sol.canConstructGraph([2, 2, 2]) == True
    print("All tests passed for 3656.")

if __name__ == "__main__":
    run_tests()
