import { TestBed } from '@angular/core/testing';

import { AuthorService } from './author.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('AuthorService', () => {

  let httpMock:HttpTestingController;
  let service:AuthorService;

  let mockAuthor ={
    "_id": "5d1e5efe755326281459d8f9",
    "firstName": "George R.R",
    "lastName": "Martin",
  };
  const mockAuthorWithoutId={
    firstName: "Charles",
    lastName: "Dickens"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        AuthorService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthorService);
  });

  it('should be created', () => {
    const service: AuthorService = TestBed.get(AuthorService);
    expect(service).toBeTruthy();
  });

  it('should get all authors', ()=>{
    service.getAuthors().subscribe(data=>{
      expect(data).toEqual([mockAuthor]);
    });
    const request= httpMock.expectOne({ method: 'GET', url: environment.apiUrl + '/authors' });
    expect(request.request.method).toEqual('GET');
    request.flush([mockAuthor]);
    httpMock.verify();
  });

  it('should get one author', ()=>{
    service.getAuthor(mockAuthor._id).subscribe(data =>{
      expect(data["firstName"]).toEqual(mockAuthor.firstName);
      expect(data["lastName"]).toEqual(mockAuthor.lastName);
    });
    const request= httpMock.expectOne({ method: 'GET', url: environment.apiUrl + '/authors/' + mockAuthor._id });
    expect(request.request.method).toEqual('GET');
    request.flush(mockAuthor);
    httpMock.verify();
  });

  it('should post a new author', ()=>{
    service.addAuthor(mockAuthorWithoutId).subscribe(data =>{
      expect(data["firstName"]).toEqual(mockAuthorWithoutId.firstName);
      expect(data["lastName"]).toEqual(mockAuthorWithoutId.lastName);
    });
    const request= httpMock.expectOne({ method: 'POST', url: environment.apiUrl + '/authors'});
    expect(request.request.method).toEqual('POST');
    request.flush(mockAuthorWithoutId);
    httpMock.verify();
  });

  it('should edit an author', ()=>{
    service.editAuthor(mockAuthor._id, mockAuthorWithoutId).subscribe(data =>{
      expect(data["firstName"]).toEqual(mockAuthorWithoutId.firstName);
      expect(data["lastName"]).toEqual(mockAuthorWithoutId.lastName);
    });
    const request= httpMock.expectOne({ method: 'PUT', url: environment.apiUrl + '/authors/' + mockAuthor._id });
    expect(request.request.method).toEqual('PUT');
    request.flush(mockAuthorWithoutId);
    httpMock.verify();
  });

  it('should delete an author', ()=>{
    service.deleteAuthor(mockAuthor._id).subscribe(data =>{
      expect(undefined).toEqual(undefined);
    });
    const request= httpMock.expectOne({ method: 'DELETE', url: environment.apiUrl + '/authors/' + mockAuthor._id });
    expect(request.request.method).toEqual('DELETE');
    request.flush({});
    httpMock.verify();
  });

  afterEach(()=>{
    TestBed.resetTestingModule();
  });
});
