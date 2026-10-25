#include <cassert>
#include <vector>
#include "solution.cpp"

int main() {
    Solution sol;
    std::vector<int> a1 = {1,2,3,4,5}, l1 = {5,2,3,3,3};
    std::vector<int> exp1 = {1};
    assert(sol.busiestServers(3, a1, l1) == exp1);
    std::vector<int> a2 = {1,2,3,4}, l2 = {1,2,1,2};
    std::vector<int> exp2 = {0};
    assert(sol.busiestServers(3, a2, l2) == exp2);
    return 0;
}