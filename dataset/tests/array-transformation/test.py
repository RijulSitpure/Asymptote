class Solution:
    def transformArray(self, arr: list[int]) -> list[int]:
        changed = True
        while changed:
            changed = False
            nxt = list(arr)
            for i in range(1, len(arr) - 1):
                if arr[i] < arr[i - 1] and arr[i] < arr[i + 1]:
                    nxt[i] += 1
                    changed = True
                elif arr[i] > arr[i - 1] and arr[i] > arr[i + 1]:
                    nxt[i] -= 1
                    changed = True
            arr = nxt
        return arr

def test():
    sol = Solution()
    assert sol.transformArray([6, 2, 3, 4]) == [6, 3, 3, 4], "test 1 failed"
    assert sol.transformArray([1, 6, 3, 4, 3, 5]) == [1, 4, 4, 4, 4, 5], "test 2 failed"
    print("✓ array-transformation passed")

if __name__ == "__main__":
    test()
