class Solution:
    def longestCommonPrefix(self, words: list[str], k: int) -> list[int]:
        n = len(words)
        if k > n - 1:
            return [0] * n

        trie = [{}]
        node_counts = [0]
        node_depths = [0]

        for w in words:
            curr = 0
            for ch in w:
                if ch not in trie[curr]:
                    trie[curr][ch] = len(trie)
                    trie.append({})
                    node_counts.append(0)
                    node_depths.append(node_depths[curr] + 1)
                curr = trie[curr][ch]
                node_counts[curr] += 1

        max_d = max(node_depths) if node_depths else 0
        depth_counts = [0] * (max_d + 1)
        for i in range(1, len(node_counts)):
            if node_counts[i] >= k:
                depth_counts[node_depths[i]] += 1

        initial_max_d = 0
        for d in range(max_d, -1, -1):
            if depth_counts[d] > 0:
                initial_max_d = d
                break

        ans = [0] * n
        for idx, w in enumerate(words):
            path = []
            curr = 0
            for ch in w:
                curr = trie[curr][ch]
                path.append(curr)

            for node in path:
                if node_counts[node] == k:
                    depth_counts[node_depths[node]] -= 1
                node_counts[node] -= 1

            if initial_max_d > len(w):
                ans[idx] = initial_max_d
            else:
                cur = initial_max_d
                while cur > 0 and depth_counts[cur] == 0:
                    cur -= 1
                ans[idx] = cur

            for node in path:
                node_counts[node] += 1
                if node_counts[node] == k:
                    depth_counts[node_depths[node]] += 1

        return ans

def run_tests():
    s = Solution()
    assert s.longestCommonPrefix(["flower","flow","flight"], 2) == [2, 2, 4]
    assert s.longestCommonPrefix(["a","b"], 2) == [0, 0]
    print("All tests passed for longest-common-prefix-of-k-strings-after-removal")

if __name__ == '__main__':
    run_tests()
