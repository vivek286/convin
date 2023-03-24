import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card';
import { createCard, getBuckets, getCardItems, stopLoading, updateCard } from '../../utils/cardSlice'
import "../../styles/Dashboard.css"
import { Button, Dropdown, Input, Modal, Select, Space } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const [bucketList, setBucketList] = useState([])
  const [displayCards, setDisplayCards] = useState([])
  const [filterBy, setFilterBy] = useState("All")
  const [selectedCard, setSelectedCard] = useState()
  const [createCardModalOpen, setCreateCardModalOpen] = useState(false)
  const [cardEditModalOpen, setCardEditModalOpen] = useState(false)
  const [cardDetailModalOpen, setCardDetailModalOpen] = useState(false)
  const [newCardName, setNewCardName] = useState("")
  const [newCardUrl, setNewCardUrl] = useState("")
  const [newCardBucket, setNewCardBucket] = useState("")
  const [editedCardName, setEditedCardName] = useState("")
  const [editedCardUrl, setEditedCardUrl] = useState("")
  const [editedCardBucket, setEditedCardBucket] = useState("")
  const { cards, buckets, isLoading } = useSelector((store) => store.card);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (newCardName === "" || newCardUrl === "") return
    const newCard = {
      id: new Date().getTime().toString(), 
      name: newCardName, 
      link: newCardUrl, 
      bucket: newCardBucket,
      time: new Date().getTime()
    }
    await dispatch(createCard(newCard)).then(res => {
      if (filterBy === "All" || filterBy === newCardBucket) {
        setDisplayCards([newCard, ...displayCards])
      }
    })
    setNewCardName("")
    setNewCardUrl("")
    setCreateCardModalOpen(false)
  }

  const handleEdit = async () => {
    const updatedCard = {
      id: selectedCard?.id,
      name: editedCardName,
      link: editedCardUrl,
      bucket: editedCardBucket
    }
    await dispatch(updateCard(updatedCard)).then(res => {
      dispatch(getCardItems())
    })
    setCardEditModalOpen(false)
  }

  const filterCardsByBucket = (bucket) => {
    setFilterBy(bucket)
    if (bucket === "All") {
      setDisplayCards(cards)
    } else {
      let filtered = cards.filter(card => card.bucket === bucket)
      setDisplayCards(filtered)
    }
  }

  useEffect(() => {
    dispatch(getCardItems()).then(res => {
      setDisplayCards(res.payload)
    })
    dispatch(getBuckets())
  }, [])

  useEffect(() => {
    filterCardsByBucket(filterBy)
  }, [cards])

  useEffect(() => {
    if (buckets) {
      let items = []
      buckets.forEach((each) => {
        items.push({
          label: each.name,
          value: each.id
        })
      })
      setNewCardBucket(items[0]?.value || "All")
      setBucketList(items)
    }
  }, [buckets])

  useEffect(() => {
    console.log(selectedCard?.bucket)
    if (selectedCard) {
      setEditedCardName(selectedCard.name)
      setEditedCardUrl(selectedCard.link)
      setEditedCardBucket(selectedCard.bucket)
    }
  }, [selectedCard])

  return (
    <div className='dashboard-container'>
      <Button onClick={() => setCreateCardModalOpen(true)}><PlusOutlined /> Create A Card</Button>
      
      {/* new card creation modal */}
      <Modal
        open={createCardModalOpen}
        title="Create Card"
        onOk={handleSubmit}
        onCancel={() => setCreateCardModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setCreateCardModalOpen(false)}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={isLoading} onClick={handleSubmit}>
            Create
          </Button>,
        ]}
      >
        <div style={{margin: "10px 0px"}}>
        Enter Card Name : 
        </div>
        <Input placeholder="Sample Card" value={newCardName} onChange={(e) => setNewCardName(e.target.value)} />
        <div style={{margin: "10px 0px"}}>
        Enter Video Link : 
        </div>
        <Input placeholder="https://..." value={newCardUrl} onChange={(e) => setNewCardUrl(e.target.value)} />
        <Space style={{marginTop: "10px"}}>
          <span>
            Choose Bucket : 
          </span>
          <Select
            defaultValue={newCardBucket}
            style={{
              width: 120,
            }}
            onChange={(bucket) => setNewCardBucket(bucket)}
            options={bucketList}
          />
        </Space>
      </Modal>

      {/* card edit modal */}
      {cardEditModalOpen &&
        <Modal
          open={cardEditModalOpen}
          title="Edit Card"
          onOk={handleEdit}
          onCancel={() => setCardEditModalOpen(false)}
          footer={[
            <Button key="back" onClick={() => setCardEditModalOpen(false)}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={isLoading} onClick={handleEdit}>
              Update
            </Button>,
          ]}
        >
          <div style={{margin: "10px 0px"}}>
          Enter Card Name : 
          </div>
          <Input placeholder="Sample Card" value={editedCardName} onChange={(e) => setEditedCardName(e.target.value)} />
          <div style={{margin: "10px 0px"}}>
          Enter Video Link : 
          </div>
          <Input placeholder="https://..." value={editedCardUrl} onChange={(e) => setEditedCardUrl(e.target.value)} />
          <Space style={{marginTop: "10px"}}>
            <span>
              Choose Bucket : 
            </span>
            <Select
              defaultValue={editedCardBucket}
              style={{
                width: 120,
              }}
              onChange={(bucket) => setEditedCardBucket(bucket)}
              options={bucketList}
            />
          </Space>
        </Modal>
      }

      {/* card detail showup modal */}
      <Modal
        open={cardDetailModalOpen}
        title="Card Details"
        onOk={handleSubmit}
        onCancel={() => {
          setSelectedCard()
          setCardDetailModalOpen(false)
        }}
        footer={[
          <Button key="back" onClick={() =>{
            setSelectedCard()
            setCardDetailModalOpen(false)
          }}>
            Close
          </Button>,
        ]}
      >
        <p style={{fontWeight: 600, fontSize: "18px", textAlign: "center"}}>{selectedCard?.name}</p>
        <iframe width="400px" height="230px" style={{margin: "auto", position: "relative", left:"50%", transform: "translate(-50%)", margin: "10px"}} src={selectedCard?.link}>
        </iframe>
      </Modal>

      <Space style={{float: "right"}}>
        <span style={{fontSize: "16px"}}>
        Filter By Bucket : 
        </span>
        <Select
          defaultValue="All"
          style={{
            width: 120,
          }}
          onChange={(bucket) => filterCardsByBucket(bucket)}
          options={[{key: "All", value: "All"}, ...bucketList]}
        />
      </Space>
      <div className='cards-container'>
        {displayCards.map((card, index) => (
            <Card key={index} cardDetails={card} setCardDetailModalOpen={setCardDetailModalOpen} setSelectedCard={setSelectedCard} setCardEditModalOpen={setCardEditModalOpen} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard