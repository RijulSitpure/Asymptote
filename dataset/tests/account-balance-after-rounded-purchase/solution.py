from typing import List, Optional
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def accountBalanceAfterPurchase(self, purchaseAmount: int) -> int:
        rounded = ((purchaseAmount + 5) // 10) * 10
        return 100 - rounded
