import { RequestHandler } from 'express';
import { spawn } from 'child_process';
import * as fs from 'fs';
import PlaceService from '../../service/place.service';
import PlaceReq from '../../type/place/placeReq';
import PlaceRes from '../../type/place/placeRes';


export const getPlaceById: RequestHandler = async (req, res, next) => {
  try {
    //const body = req.body as PlaceReq;
    //console.log(body);
    const id = Number(req.query.id);
    //console.log(id);
    const place = await PlaceService.getPlaceById(id) as PlaceRes;
    //console.log(place);
    res.status(200).json(place);
  } catch (error) {
    next(error);
  }
};

export const getPlace: RequestHandler = async (req, res, next) => {
  try {
    const dataFromFrontend = req.body as PlaceReq;

    // TypeScript에서 파이썬 스크립트 실행
    //npm install --save spawn-npm
    const pythonProcess = spawn('python', [
      'crawling/crawling.py',
      JSON.stringify(dataFromFrontend),
    ]);

    // 파이썬 스크립트가 종료되었을 때 이벤트 핸들러
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        // 파이썬 스크립트가 성공적으로 종료된 경우

        // JSON 파일 경로
        const jsonFilePath = 'output.json';

        // JSON 파일 읽기 함수
        function readJsonFile(filePath: string): any {
          try {
            // JSON 파일을 읽어서 파싱
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(jsonData);
          } catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
          }
        }

        // JSON 파일 읽기
        const jsonData = readJsonFile(jsonFilePath) as PlaceRes;

        // 읽어온 JSON 데이터 활용
        if (jsonData) {
          console.log('Read JSON data:', jsonData);
          res.json(jsonData);
          // 여기에서 필요한 작업 수행
        } else {
          console.error('Failed to read JSON data.');
        }
      } else {
        console.error(`Python script exited with code ${code}`);
      }
    });
  } catch (error) {
    next(error);
  }
};

/*
export const getPlaceById: RequestHandler = async (req, res, next) => {
  try {
    const placeId = req.params.id;

    // TypeScript에서 파이썬 스크립트 실행
    const pythonProcess = spawn('python', [
      'crawling/crawling_id_detector.py',
      JSON.stringify(placeId),
    ]);

    // 파이썬 스크립트가 종료되었을 때 이벤트 핸들러
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        // 파이썬 스크립트가 성공적으로 종료된 경우

        // JSON 파일 경로
        const jsonFilePath = 'output.json';

        // JSON 파일 읽기 함수
        function readJsonFile(filePath: string): any {
          try {
            // JSON 파일을 읽어서 파싱
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(jsonData);
          } catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
          }
        }

        // JSON 파일 읽기
        const jsonData = readJsonFile(jsonFilePath) as PlaceRes;

        // 읽어온 JSON 데이터 활용
        if (jsonData) {
          console.log('Read JSON data:', jsonData);
          res.json(jsonData);
          // 여기에서 필요한 작업 수행
        } else {
          console.error('Failed to read JSON data.');
        }
      } else {
        console.error(`Python script exited with code ${code}`);
      }
    });
  } catch (error) {
    next(error);
  }
};
*/