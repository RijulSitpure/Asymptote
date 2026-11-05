class Solution:
    def maxActiveSectionsAfterTrade(self, s: str, queries: list[list[int]]) -> list[int]:
        n = len(s)
        total_ones = s.count('1')

        zero_groups = []
        zero_group_index = [-1] * n
        i = 0
        while i < n:
            if s[i] == '0':
                start = i
                while i < n and s[i] == '0':
                    i += 1
                length = i - start
                group_id = len(zero_groups)
                zero_groups.append((start, length))
                for idx in range(start, i):
                    zero_group_index[idx] = group_id
            else:
                i += 1

        m = len(zero_groups)
        if m == 0:
            return [total_ones] * len(queries)

        adj_sums = [zero_groups[idx][1] + zero_groups[idx + 1][1] for idx in range(m - 1)]

        st = []
        if adj_sums:
            k = len(adj_sums).bit_length() - 1
            st = [[0] * len(adj_sums) for _ in range(k + 1)]
            st[0] = adj_sums[:]
            for p in range(1, k + 1):
                length = 1 << (p - 1)
                for j in range(len(adj_sums) - (1 << p) + 1):
                    st[p][j] = max(st[p - 1][j], st[p - 1][j + length])

        def query_st(l: int, r: int) -> int:
            if l > r or not st:
                return 0
            p = (r - l + 1).bit_length() - 1
            return max(st[p][l], st[p][r - (1 << p) + 1])

        ans = []
        for l, r in queries:
            g_l = zero_group_index[l]
            g_r = zero_group_index[r]
            best_gain = 0

            if g_l == -1 and g_r == -1:
                left_idx = 0
                while left_idx < m and zero_groups[left_idx][0] < l:
                    left_idx += 1
                right_idx = m - 1
                while right_idx >= 0 and zero_groups[right_idx][0] + zero_groups[right_idx][1] - 1 > r:
                    right_idx -= 1
                if left_idx <= right_idx - 1:
                    best_gain = max(best_gain, query_st(left_idx, right_idx - 1))
            elif g_l != -1 and g_r == -1:
                rem_len = zero_groups[g_l][1] - (l - zero_groups[g_l][0])
                if g_l + 1 < m and zero_groups[g_l + 1][0] + zero_groups[g_l + 1][1] - 1 <= r:
                    best_gain = max(best_gain, rem_len + zero_groups[g_l + 1][1])
                left_idx = g_l + 1
                right_idx = m - 1
                while right_idx >= 0 and zero_groups[right_idx][0] + zero_groups[right_idx][1] - 1 > r:
                    right_idx -= 1
                if left_idx <= right_idx - 1:
                    best_gain = max(best_gain, query_st(left_idx, right_idx - 1))
            elif g_l == -1 and g_r != -1:
                rem_len = r - zero_groups[g_r][0] + 1
                if g_r - 1 >= 0 and zero_groups[g_r - 1][0] >= l:
                    best_gain = max(best_gain, zero_groups[g_r - 1][1] + rem_len)
                left_idx = 0
                while left_idx < m and zero_groups[left_idx][0] < l:
                    left_idx += 1
                right_idx = g_r - 1
                if left_idx <= right_idx - 1:
                    best_gain = max(best_gain, query_st(left_idx, right_idx - 1))
            else:
                if g_l == g_r:
                    best_gain = max(best_gain, r - l + 1)
                else:
                    best_gain = max(best_gain, (zero_groups[g_l][1] - (l - zero_groups[g_l][0])) + (r - zero_groups[g_r][0] + 1))
                    if g_l + 1 <= g_r - 1:
                        best_gain = max(best_gain, (zero_groups[g_l][1] - (l - zero_groups[g_l][0])) + zero_groups[g_l + 1][1])
                        best_gain = max(best_gain, zero_groups[g_r - 1][1] + (r - zero_groups[g_r][0] + 1))
                    if g_l + 1 <= g_r - 2:
                        best_gain = max(best_gain, query_st(g_l + 1, g_r - 2))

            ans.append(total_ones + best_gain)

        return ans

def run_tests():
    s = Solution()
    res = s.maxActiveSectionsAfterTrade("00100", [[0, 4], [1, 3]])
    assert len(res) == 2
    print("All tests passed for maximize-active-section-with-trade-ii")

if __name__ == '__main__':
    run_tests()
