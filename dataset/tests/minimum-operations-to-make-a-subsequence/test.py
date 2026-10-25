import bisect

class Solution:
    def minOperations(self, target: list[int], arr: list[int]) -> int:
        pos = {x: i for i, x in enumerate(target)}
        mapped = [pos[x] for x in arr if x in pos]
        lis = []
        for x in mapped:
            idx = bisect.bisect_left(lis, x)
            if idx == len(lis):
                lis.append(x)
            else:
                lis[idx] = x
        return len(target) - len(lis)

def test():
    sol = Solution()
    assert sol.minOperations([5,1,3], [9,4,2,3,4]) == 2
    assert sol.minOperations([6,4,8,1,3,2], [4,7,6,2,3,8,6,1]) == 3

    print("✓ minimum-operations-to-make-a-subsequence passed")

if __name__ == '__main__':
    test()
