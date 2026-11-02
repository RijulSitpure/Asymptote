from typing import List, Optional
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def kthLuckyNumber(self, k: int) -> str:
        return bin(k + 1)[3:].replace('0', '4').replace('1', '7')
