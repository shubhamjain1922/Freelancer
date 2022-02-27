pragma solidity ^0.4.17;

contract ProjectFactory {
    address[] public deployedProjects;

    function createProject(string title,uint maximum,string category,string detail) public {
        address newProject = new Project(title,maximum,msg.sender,category,detail);
        deployedProjects.push(newProject);
    }

    function getProjects() public view returns(address[]) {
        return deployedProjects;
    }
}

contract Project {
    struct Freelancers {
        string detail;
        uint price;
        bool hired;
    }
    address public manager;
    uint public maxPrice;
    string public description;
    string public title;
    string public category;
    bool public finished;
    bool public hired;
    address public recipient;
    mapping(address=>Freelancers) public freelancersadd;
    address[] public freelancersarr;

    modifier restricted() {
        require(manager==msg.sender);
        _;
    }

    function Project(string t,uint maximum, address creator,string cat,string detail) public {
        manager=creator;
        maxPrice = maximum;
        title=t;
        category=cat;
        description=detail;
        finished=false;
        hired=false;
        recipient=manager;
    }

    function apply(uint price,string descrip) public {
        require(!hired);
        require(maxPrice>=price);
        Freelancers memory newfree = Freelancers({
            detail: descrip,
            price: price,
            hired: false
        });
        freelancersadd[msg.sender]=newfree;
        freelancersarr.push(msg.sender);
    }

    function hire(uint index) public restricted payable{
        require(!hired);
        address t = freelancersarr[index];
        require(freelancersadd[t].price==msg.value);
        recipient =t;
        freelancersadd[t].hired=true;
        hired=true;
    }

    function finish() public restricted{
        recipient.transfer(this.balance);
        finished=true;
    }

    function cancel() public {
        require(freelancersadd[msg.sender].hired==true);
        freelancersadd[msg.sender].hired=false;
        hired=false;
        recipient=manager;
        manager.transfer(this.balance);
    } 

    function cancelmanager() public restricted {
        if(!hired){
        manager.transfer(this.balance);
        }
        else
        {
            uint a=this.balance*20/100;
            freelancersadd[recipient].hired=false;
            hired=false;
            recipient.transfer(a);
            manager.transfer(this.balance);
            recipient=manager;
        }
    } 

    function getSummary() public view returns(string,uint,string,string,address,bool,bool,uint) {
        return (title,maxPrice,category,description,manager,hired,finished,freelancersarr.length);
    }

    function getApps() public view returns(address[]) {
        return (freelancersarr);
    }
}