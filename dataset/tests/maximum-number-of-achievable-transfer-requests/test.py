class Solution:
    def maximumRequests(self, n: int, requests: list[list[int]]) -> int:
        m = len(requests)
        ans = 0
        for mask in range(1 << m):
            count = bin(mask).count("1")
            if count <= ans:
                continue
            delta = [0] * n
            for i in range(m):
                if mask & (1 << i):
                    u, v = requests[i]
                    delta[u] -= 1
                    delta[v] += 1
            if all(d == 0 for d in delta):
                ans = count
        return ans

def test():
    sol = Solution()
    assert sol.maximumRequests(5, [[0,1],[1,0],[0,1],[1,2],[2,0],[3,4]]) == 5
    assert sol.maximumRequests(3, [[0,0],[1,2],[2,1]]) == 3
    assert sol.maximumRequests(4, [[0,3],[3,1],[1,2],[2,0]]) == 4

    print("✓ maximum-number-of-achievable-transfer-requests passed")

if __name__ == '__main__':
    test()
