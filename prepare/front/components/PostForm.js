import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import {
  ADD_POST_REQUEST,
  REMOVE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
  addPost,
} from '../reducers/post';

const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`;

const ButtonStyle = styled(Button)`
  float: 'right';
`;

const PostForm = () => {
  const { imagePaths, addPostLoading, addPostDone } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmitForm = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);

    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files); //배열모양을 띄는 객체
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    []
  );

  return (
    <FormWrapper encType='multipart/form-data' onFinish={onSubmitForm}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder='어떤 신기한 일이 있었나요?'
      />
      <div>
        <input
          onChange={onChangeImages}
          type='file'
          name='image'
          hidden
          multiple
          ref={imageInput}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <ButtonStyle type='primary' htmlType='submit'>
          Twit
        </ButtonStyle>
      </div>
      <div>
        {imagePaths.map((item, i) => (
          <div key={item} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3060/${item}`}
              style={{ width: '200px' }}
              alt={item}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </FormWrapper>
  );
};

export default PostForm;
