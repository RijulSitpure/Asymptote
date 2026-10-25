class Solution:
    def getMinSwaps(self, num: str, k: int) -> int:
        target = list(num)
        n = len(target)

        def next_perm(arr: list[str]):
            i = n - 2
            while i >= 0 and arr[i] >= arr[i + 1]:
                i -= 1
            if i >= 0:
                j = n - 1
                while arr[j] <= arr[i]:
                    j -= 1
                arr[i], arr[j] = arr[j], arr[i]
            arr[i + 1:] = reversed(arr[i + 1:])

        for _ in range(k):
            next_perm(target)

        orig = list(num)
        ans = 0
        for i in range(n):
            if orig[i] != target[i]:
                j = i
                while orig[j] != target[i]:
                    j += 1
                while j > i:
                    orig[j], orig[j - 1] = orig[j - 1], orig[j]
                    ans += 1
                    j -= 1
        return ans

def test():
    sol = Solution()
    assert sol.getMinSwaps("5489355142", 4) == 2
    assert sol.getMinSwaps("11112", 4) == 4
    assert sol.getMinSwaps("00123", 1) == 1

if __name__ == '__main__':
    test()
