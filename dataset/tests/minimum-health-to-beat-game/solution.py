from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def minimumHealth(self, damage: list[int], armor: int) -> int:
        return 1 + sum(damage) - min(armor, max(damage))
