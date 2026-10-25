import math

class Solution:
    def kthSmallestPath(self, destination: list[int], k: int) -> str:
        v, h = destination
        res = []
        total_steps = v + h
        for _ in range(total_steps):
            if h > 0:
                paths_with_h = math.comb(h - 1 + v, h - 1)
                if k <= paths_with_h:
                    res.append("H")
                    h -= 1
                else:
                    res.append("V")
                    k -= paths_with_h
                    v -= 1
            else:
                res.append("V")
                v -= 1
        return "".join(res)

def test():
    sol = Solution()
    assert sol.kthSmallestPath([2,3], 1) == "HHHVV"
    assert sol.kthSmallestPath([2,3], 2) == "HHVHV"
    assert sol.kthSmallestPath([2,3], 3) == "HHVVH"

    print("✓ kth-smallest-instructions passed")

if __name__ == '__main__':
    test()
