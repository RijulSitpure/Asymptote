class Solution:
    def relativeSortArray(self, arr1: list[int], arr2: list[int]) -> list[int]:
        count = [0] * 1001
        for x in arr1:
            count[x] += 1
        
        res = []
        for x in arr2:
            while count[x] > 0:
                res.append(x)
                count[x] -= 1
        
        for x in range(1001):
            while count[x] > 0:
                res.append(x)
                count[x] -= 1
        return res

def test():
    sol = Solution()
    a1 = [2,3,1,3,2,4,6,7,9,2,19]
    a2 = [2,1,4,3,9,6]
    assert sol.relativeSortArray(a1, a2) == [2,2,2,1,4,3,3,9,6,7,19], "test 1 failed"
    b1 = [28,6,22,8,44,17]
    b2 = [22,28,8,6]
    assert sol.relativeSortArray(b1, b2) == [22,28,8,6,17,44], "test 2 failed"
    print("✓ relative-sort-array passed")

if __name__ == "__main__":
    test()
