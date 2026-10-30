class Solution:
    def countTheNumOfKFreeSubsets(self, nums: list[int], k: int) -> int:
        from collections import defaultdict
        groups = defaultdict(list)
        for x in nums:
            groups[x % k].append(x)
        total_subsets = 1
        for rem, vals in groups.items():
            vals.sort()
            chains = []
            curr_chain = [vals[0]]
            for i in range(1, len(vals)):
                if vals[i] == vals[i - 1] + k:
                    curr_chain.append(vals[i])
                else:
                    chains.append(len(curr_chain))
                    curr_chain = [vals[i]]
            chains.append(len(curr_chain))
            for L in chains:
                f0, f1 = 1, 2
                for _ in range(L - 1):
                    f0, f1 = f1, f0 + f1
                total_subsets *= f1
        return total_subsets
