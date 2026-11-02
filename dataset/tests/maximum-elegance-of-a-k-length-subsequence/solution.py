from typing import List, Optional
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def findMaximumElegance(self, items: List[List[int]], k: int) -> int:
        items.sort(key=lambda x: x[0], reverse=True)
        total_profit = 0
        seen_categories = set()
        duplicates = []
        for profit, cat in items[:k]:
            total_profit += profit
            if cat in seen_categories:
                duplicates.append(profit)
            else:
                seen_categories.add(cat)
        distinct_count = len(seen_categories)
        ans = total_profit + distinct_count * distinct_count
        for profit, cat in items[k:]:
            if cat not in seen_categories and duplicates:
                seen_categories.add(cat)
                total_profit += profit - duplicates.pop()
                distinct_count += 1
                ans = max(ans, total_profit + distinct_count * distinct_count)
        return ans
