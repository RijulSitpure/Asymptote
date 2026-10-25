class Solution:
    def minimumTeachings(self, n: int, languages: list[list[int]], friendships: list[list[int]]) -> int:
        lang_sets = [set(langs) for langs in languages]
        broken_users = set()

        for u, v in friendships:
            u_idx, v_idx = u - 1, v - 1
            if not (lang_sets[u_idx] & lang_sets[v_idx]):
                broken_users.add(u_idx)
                broken_users.add(v_idx)

        if not broken_users:
            return 0

        ans = float('inf')
        for l in range(1, n + 1):
            teach_count = sum(1 for u in broken_users if l not in lang_sets[u])
            ans = min(ans, teach_count)
        return ans

def test():
    sol = Solution()
    assert sol.minimumTeachings(2, [[1],[2],[1,2]], [[1,2],[1,3],[2,3]]) == 1
    assert sol.minimumTeachings(3, [[2],[1,3],[1,2],[3]], [[1,4],[1,2],[3,4],[2,3]]) == 2

    print("✓ minimum-number-of-people-to-teach passed")

if __name__ == '__main__':
    test()
