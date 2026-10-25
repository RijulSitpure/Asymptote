class Solution:
    def canBeIncreasing(self, nums: list[int]) -> bool:
        arr = list(nums)
        cnt = 0
        for i in range(1, len(arr)):
            if arr[i] <= arr[i - 1]:
                cnt += 1
                if cnt > 1:
                    return False
                if i > 1 and arr[i] <= arr[i - 2]:
                    arr[i] = arr[i - 1]
        return True

def test():
    sol = Solution()
    assert sol.canBeIncreasing([1,2,10,5,7]) == True
    assert sol.canBeIncreasing([2,3,1,2]) == False
    assert sol.canBeIncreasing([1,1,1]) == False

if __name__ == '__main__':
    test()
