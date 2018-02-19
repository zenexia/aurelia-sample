let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let projects = [
  {
    id:getId(),
    firstName:'John',
    lastName:'Tolkien',
    email:'tolkien@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id:getId(),
    firstName:'Clive',
    lastName:'Lewis',
    email:'lewis@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id:getId(),
    firstName:'Owen',
    lastName:'Barfield',
    email:'barfield@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id:getId(),
    firstName:'Charles',
    lastName:'Williams',
    email:'williams@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id:getId(),
    firstName:'Roger',
    lastName:'Green',
    email:'green@inklings.com',
    phoneNumber:'867-5309'
  }
];

export class WebAPI {
  isRequesting = false;
  
  getProjectList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = projects.map(x =>  { return {
          id:x.id,
          firstName:x.firstName,
          lastName:x.lastName,
          email:x.email
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getProjectDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = projects.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveProject(project){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(project));
        let found = projects.filter(x => x.id == project.id)[0];

        if(found){
          let index = projects.indexOf(found);
          projects[index] = instance;
        }else{
          instance.id = getId();
          projects.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
