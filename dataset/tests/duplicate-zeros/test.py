from typing import List

class Solution:
    def duplicateZeros(self, arr: List[int]) -> None:
        n = len(arr)
        zeros = 0
        i = 0
        while i + zeros < n:
            if arr[i] == 0:
                if i + zeros == n - 1:
                    arr[n - 1] = 0
                    n -= 1
                    break
                zeros += 1
            i += 1

        last = i - 1
        for j in range(last, -1, -1):
            if arr[j] == 0:
                arr[j + zeros] = 0
                zeros -= 1
                arr[j + zeros] = 0
            else:
                arr[j + zeros] = arr[j]

def test():
    sol = Solution()
    a1 = [1,0,2,3,0,4,5,0]
    sol.duplicateZeros(a1)
    assert a1 == [1,0,0,2,3,0,0,4], "test 1 failed"
    a2 = [1,2,3]
    sol.duplicateZeros(a2)
    assert a2 == [1,2,3], "test 2 failed"
    print("✓ duplicate-zeros passed")

if __name__ == "__main__":
    test()
