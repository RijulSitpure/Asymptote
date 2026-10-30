class Solution:
    def garbageCollection(self, garbage: list[str], travel: list[int]) -> int:
        pref = [0]
        for t in travel:
            pref.append(pref[-1] + t)
        
        last_idx = {}
        total_items = 0
        for i, house in enumerate(garbage):
            total_items += len(house)
            for ch in house:
                last_idx[ch] = i
        
        travel_time = sum(pref[last_idx[ch]] for ch in last_idx)
        return total_items + travel_time
