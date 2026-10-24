from typing import List

class Solution:
    def numFriendRequests(self, ages: List[int]) -> int:
        count = [0] * 121
        for a in ages:
            count[a] += 1

        prefix = [0] * 121
        for i in range(1, 121):
            prefix[i] = prefix[i - 1] + count[i]

        ans = 0
        for a in range(15, 121):
            if count[a] == 0:
                continue
            low = a // 2 + 7
            valid_y = prefix[a] - prefix[low]
            ans += count[a] * (valid_y - 1)

        return ans

def test():
    sol = Solution()
    assert sol.numFriendRequests([16, 16]) == 2, "test 1 failed"
    assert sol.numFriendRequests([16, 17, 18]) == 2, "test 2 failed"
    assert sol.numFriendRequests([20, 30, 100, 110, 120]) == 3, "test 3 failed"
    print("✓ friends-of-appropriate-ages passed")

if __name__ == "__main__":
    test()
