class Solution:
    def replaceElements(self, arr: list[int]) -> list[int]:
        max_val = -1
        for i in range(len(arr) - 1, -1, -1):
            arr[i], max_val = max_val, max(max_val, arr[i])
        return arr

def test():
    sol = Solution()
    assert sol.replaceElements([17,18,5,4,6,1]) == [18,6,6,6,1,-1], "test 1 failed"
    assert sol.replaceElements([400]) == [-1], "test 2 failed"
    print("✓ replace-elements-with-greatest-element-on-right-side passed")

if __name__ == "__main__":
    test()
