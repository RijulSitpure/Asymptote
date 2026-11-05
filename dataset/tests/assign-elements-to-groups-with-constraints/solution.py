class Solution:
    def assignElements(self, groups: list[int], elements: list[int]) -> list[int]:
        max_group = max(groups)
        first_idx = {}
        for idx, val in enumerate(elements):
            if val not in first_idx:
                first_idx[val] = idx
                
        best_assignment = {}
        for val, idx in first_idx.items():
            if val > max_group:
                continue
            multiple = val
            while multiple <= max_group:
                if multiple not in best_assignment or idx < best_assignment[multiple]:
                    best_assignment[multiple] = idx
                multiple += val
                
        return [best_assignment.get(g, -1) for g in groups]
