class Solution:
    def countHighestScoreNodes(self, parents: list[int]) -> int:
        n = len(parents)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parents[i]].append(i)

        subtree_size = [0] * n

        def calc_size(node: int) -> int:
            sz = 1
            for ch in children[node]:
                sz += calc_size(ch)
            subtree_size[node] = sz
            return sz

        calc_size(0)

        max_score = 0
        count = 0

        for i in range(n):
            score = 1
            rem = n - subtree_size[i]
            if rem > 0:
                score *= rem
            for ch in children[i]:
                score *= subtree_size[ch]
            if score > max_score:
                max_score = score
                count = 1
            elif score == max_score:
                count += 1

        return count
