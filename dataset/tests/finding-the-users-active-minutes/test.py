from collections import defaultdict

class Solution:
    def findingUsersActiveMinutes(self, logs: list[list[int]], k: int) -> list[int]:
        user_minutes = defaultdict(set)
        for uid, minute in logs:
            user_minutes[uid].add(minute)

        ans = [0] * k
        for minutes in user_minutes.values():
            count = len(minutes)
            if 1 <= count <= k:
                ans[count - 1] += 1
        return ans

def test():
    sol = Solution()
    assert sol.findingUsersActiveMinutes([[0,5],[1,2],[0,2],[0,5],[1,3]], 5) == [0,2,0,0,0]
    assert sol.findingUsersActiveMinutes([[1,1],[2,2],[2,3]], 4) == [1,1,0,0]

if __name__ == '__main__':
    test()
