class Solution:
    def minOperations(self, boxes: str) -> list[int]:
        n = len(boxes)
        ans = [0] * n

        count = 0
        ops = 0
        for i in range(n):
            ans[i] += ops
            if boxes[i] == '1':
                count += 1
            ops += count

        count = 0
        ops = 0
        for i in range(n - 1, -1, -1):
            ans[i] += ops
            if boxes[i] == '1':
                count += 1
            ops += count

        return ans

def test():
    sol = Solution()
    assert sol.minOperations("110") == [1,1,3]
    assert sol.minOperations("001011") == [11,8,5,4,3,4]

    print("✓ minimum-number-of-operations-to-move-all-balls-to-each-box passed")

if __name__ == '__main__':
    test()
